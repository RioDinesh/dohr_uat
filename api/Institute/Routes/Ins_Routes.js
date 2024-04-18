const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    INSTITUTE_POST: Post,
    INSTITUTE_GET:Get,
    INSTITUTE_EDIT:Edit,
    INSTITUTE_DELETE:Delete
};