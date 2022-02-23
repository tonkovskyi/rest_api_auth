const RefCode = require("../models/refCode.model");
const Sociality = require("../models/sociality.model");

const refferal = async (req, res, next) => {
  try {
    const refcode = req.body.refcode;
    if (refcode === null) {
      return next();
    }
    const hasRef = await RefCode.findOne({ where: { refcode: refcode } });
    if (!hasRef) {
      return next();
    }
    const alrCreated = await Sociality.findOne({
      where: { id: hasRef.id },
    });
    if (!alrCreated) {
      await Sociality.create({ id: hasRef.id, sociality: 5 }).then(async () => {
        await RefCode.destroy({ where: { id: hasRef.id } });
      });
      return next();
    }
    await Sociality.increment(
      { sociality: 5 },
      { where: { id: hasRef.id } }
    ).then(async () => {
      await RefCode.destroy({ where: { id: hasRef.id } });
    });
    return next();
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = refferal;
