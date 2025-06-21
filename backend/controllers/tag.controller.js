const tagService = require("../services/tags.service");

exports.getTags = async (req, res) => {
  try {
    const tags = await tagService.getTags();
    res.json(tags);
  } catch (error) {}
};

exports.createTags = async (req, res) => {
  try {
    const { tag_name } = req.body;

    const tags = await tagService.createTags({
      tag_name,
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error adding tags", error);
  }
};

exports.updateTags = async (req, res) => {
  try {
    const { id } = req.aprams;
    const { tag_name } = req.body;

    const updatedTags = await tagService.updateTags(parseInt(id), {
      tag_name,
    });
    res.status(200).json({
      message: "Updated Successfully",
      data: updatedTags,
    });
  } catch (error) {
    console.error("Error updating tags", error);
  }
};

exports.deleteTags = async (req, res) => {
  try {
    const { id } = req.params;
    await tagService.deleteTags(parseInt(id));
    res.status(200).json({
      message: "Deleted Succesfully",
    });
  } catch (error) {}
};
