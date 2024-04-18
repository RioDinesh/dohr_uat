const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    CONSULTANT_POST: Post,
    CONSULTANT_GET:Get,
    CONSULTANT_EDIT:Edit,
    CONSULTANT_DELETE:Delete
};