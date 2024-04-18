const Post=require("../Controller/Post_Controller");
const Get=require("../Controller/Get_Controller");
const Edit=require("../Controller/Edit_Controller");
const Delete=require("../Controller/Delete_Controller");

module.exports={
    CUSTOMER_POST: Post,
    CUSTOMER_GET:Get,
    CUSTOMER_EDIT:Edit,
    CUSTOMER_DELETE:Delete
};