const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    DOCARE_POST: Post,
    DOCARE_GET:Get,
    DOCARE_EDIT:Edit,
    DOCARE_DELETE:Delete
};