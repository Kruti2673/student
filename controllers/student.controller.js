const Student = require("../model/Student");
const Students = require("../students");
const mongodb = require("mongodb");

module.exports.getStudents = async (req, res) => {
  const data = await Student.find({});
  console.log("data:", data);
  return res.json(Students);
};

module.exports.postStudents = async (req, res) => {
  const data = new Student({
    id: Students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });

  const savedStudent = await data.save();
  console.log("savedStudent:", savedStudent);

  return res.send({ status: true, data });
};

module.exports.putStudents = async (req, res) => {
  const data = await Student.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
    }
  );
  res.send(data);
};

module.exports.deleteStudents = async (req, res) => {
  const data = await Student.findOneAndDelete({ id: req.params.id });
  if (!req.params.id) {
    return res.status(400).send();
  }
  res.send(data);
};
