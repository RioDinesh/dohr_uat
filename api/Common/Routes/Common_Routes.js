const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    COMMON_POST: Post,
    COMMON_GET:Get,
    COMMON_EDIT:Edit,
    COMMON_DELETE:Delete
};