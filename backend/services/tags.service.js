const prisma = require("../config/prisma");

exports.getTags = async () => {
  return await prisma.tag.findMany();
};

exports.createTags = async (data) => {
  return await prisma.tag.create({
    data,
  });
};


exports.updateTags = async(id, data) => {
    return await prisma.updateTags.update({
        where: {tag_id: id},
        data
    })
}

exports.deleteTags = async(id) => {
    return await prisma.deleteTags.delete({
        where: {tag_id: id},
    })
}