const Helper = require("./helper");
const {
  Sequelize: { Op },
  sequelize
} = require("../database");

class UniqueNumberGenerate {
  async uniqueNumber({ model, pref, publicId, transaction }) {
    try {
      function zeroFill(targetString, width) {
        width -= targetString.toString().length;
        if (width > 0) {
          return (
            new Array(width + (/\./.test(targetString) ? 2 : 1)).join("0") +
            targetString
          );
        }
        return targetString + "";
      }

      const limit = 1;
      const offset = 0;
      const order = [["sequence_no", "desc"]];
      const response = await model.findAndCountAll({
        where: {
          sequence_no: {
            [Op.not]: null,
          },
        },
        attributes: ["sequence_no"],
        order,
        limit,
        offset,
        transaction: transaction,
      });

      let sequence_no = "000001";

      if (response) {
        const { count, rows } = response;
        const doc = rows.map((element) =>
          Helper.convertSnakeToCamel(element.dataValues)
        );

        if (doc && doc.length > 0 && doc[0]["sequenceNo"]) {
          let sequence_no_original = doc[0]["sequenceNo"];
          sequence_no = sequence_no_original.replace(/^\D+/g, "");
          sequence_no = parseInt(sequence_no) + 1;
        }
      }

      let seqNo = zeroFill(sequence_no, 7);
      let sequenceNo = pref + seqNo;

      await model.update(
        { sequence_no: sequenceNo },
        {
          where: { public_id: publicId },
          transaction: transaction,
        }
      );
    } catch (error) {
      throw error;
    }

  
  }
}

module.exports = new UniqueNumberGenerate();