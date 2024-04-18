const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    ADMIN_POST: Post,
    ADMIN_GET:Get,
    ADMIN_EDIT:Edit,
    ADMIN_DELETE:Delete
};