const {
    DOCARE_POST,
    DOCARE_GET,
    DOCARE_DELETE,
    DOCARE_EDIT
}  = require('../api/docare/Routes/Docare_Routes');

const Router = require('express').Router();

Router.post("/add_testimonials",DOCARE_POST.add_testimonials);
Router.post("/add_stay_connected",DOCARE_POST.add_stay_connected);
Router.post("/add_price_plans",DOCARE_POST.add_price_plans);
Router.post("/add_contact_us",DOCARE_POST.add_contact_us);
Router.post("/add_team_member",DOCARE_POST.add_team_member);
Router.post("/add_work_with_us",DOCARE_POST.add_work_with_us);


Router.get("/get_testimonials",DOCARE_GET.get_testimonials);
Router.get("/get_stay_connected",DOCARE_GET.get_stay_connected);
Router.get("/get_price_plans",DOCARE_GET.get_price_plans);
Router.get("/get_contact_us",DOCARE_GET.get_contact_us);
Router.get("/get_work_with_us",DOCARE_GET.get_work_with_us);
Router.get("/get_team_member",DOCARE_GET.get_team_member);


Router.post("/delete_contact_us",DOCARE_DELETE.delete_contact_us);
Router.post("/delete_price_plans",DOCARE_DELETE.delete_price_plans);
Router.post("/delete_stay_connected",DOCARE_DELETE.delete_stay_connected);
Router.post("/delete_testimonials",DOCARE_DELETE.delete_testimonials);
Router.post("/delete_work_with_us",DOCARE_DELETE.delete_work_withUs);
Router.post("/delete_team_member",DOCARE_DELETE.delete_team_member);


Router.post("/edit_price_plans",DOCARE_EDIT.edit_price_plans);

module.exports = Router;