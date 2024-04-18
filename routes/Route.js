const {
    ADMIN_POST,
    ADMIN_EDIT,
    ADMIN_DELETE,
    ADMIN_GET
}  = require('../api/Admin/Routes/Admin_Routes');

const {
    INSTITUTE_POST,
    INSTITUTE_EDIT,
    INSTITUTE_DELETE,
    INSTITUTE_GET
}  = require('../api/Institute/Routes/Ins_Routes');
const {
    COMMON_POST,
    COMMON_EDIT,
    COMMON_DELETE,
    COMMON_GET
}  = require('../api/Common/Routes/Common_Routes');
const {
    CONSULTANT_POST,
    CONSULTANT_EDIT,
    CONSULTANT_DELETE,
    CONSULTANT_GET
}  = require('../api/Consultant/Routes/Consultant_Routes');

const {
    CUSTOMER_POST,
    CUSTOMER_EDIT,
    CUSTOMER_DELETE,
    CUSTOMER_GET
}  = require('../api/Customer/Routes/Customer_Routes');

const Router = require('express').Router();
const { checkToken } = require('../auth/TokenValidation');

//>=====================================================================================Admin==================================================================================================

//> POST//
Router.post("/AdminLogin", ADMIN_POST.admin_login);
Router.post("/Add_Admin",ADMIN_POST.create_admin);
Router.post("/Add_Institute",ADMIN_POST.add_institute);
Router.post("/Add_Express_Pass",ADMIN_POST.add_express_pass);
Router.post("/Get_Express_Pass_Api",ADMIN_POST.get_express_pass_api);
Router.post("/Get_tick_box",ADMIN_POST.get_tick_box);
Router.post("/add_title",ADMIN_POST.add_Legal);
Router.post("/add_contactus_master",ADMIN_POST.add_Contactus_Master);
Router.post("/add_description",ADMIN_POST.add_description);
Router.post("/add_faq",ADMIN_POST.add_faq);
Router.post("/add_faq_list",ADMIN_POST.add_faq_list);
Router.post("/feedback_for_dohr",ADMIN_POST.feedback_for_dohr);
Router.post("/Add_contactUs_Message",ADMIN_POST.add_contactUs_message);
Router.post("/Get_contact_us_data",ADMIN_POST.Get_ContactUsAll);
Router.post("/Get_All_Customer",ADMIN_POST.customer_analytics);
Router.post("/Get_All_Consultant",ADMIN_POST.consultant_analytics);
Router.post("/Get_ExpressPass_UserDetails",ADMIN_POST.ExpressPassUserDetails);
Router.post("/Get_Vacancy_Cancel_UserDetails",ADMIN_POST.GetVacancyCancelUserDeatils);
Router.post("/Add_Advertisement",ADMIN_POST.Add_advertisment);
Router.post("/Get_Advertisement",ADMIN_POST.Get_advertisment);
Router.post("/add_subscribe_email",ADMIN_POST.Add_subscribe_email);



//< POST//
//> GET//
Router.get("/get_feedback_dohr",ADMIN_POST.Get_feedback_for_dohr);
Router.get("/contactUs",ADMIN_POST.contactUs_menu);
Router.get("/Get_ApproveList",ADMIN_GET.get_Approve_list);
Router.get("/Get_DenyList",ADMIN_GET.get_Deny_list);
Router.get("/Get_AllConsultant",ADMIN_GET.get_consultant_list);
Router.get("/Get_Express_Pass",ADMIN_GET.get_express_pass);
Router.get("/Get_Legal",ADMIN_GET.get_Legal);
Router.get("/Get_Faq",ADMIN_GET.get_faq);
Router.get("/Get_ContactUs",ADMIN_POST.Get_ContactUs);
Router.get("/Get_Feedback_for_dohr",ADMIN_GET.get_feedback_for_dohr);
Router.get("/get_all_sub_email",ADMIN_GET.get_all_sub_email);

//< GET//

//> EDIT//
Router.post("/Approve_Consultant",ADMIN_EDIT.approve_sub);
Router.post("/Deny_Consultant",ADMIN_EDIT.deny_sub);
Router.post("/Edit_ExpressPass",ADMIN_EDIT.edit_pass);
Router.post("/Book_Pass",ADMIN_EDIT.book_pass);
Router.post("/Make_Customer_Active",ADMIN_EDIT.make_active_user);
Router.post("/Make_Consultant_InActive",ADMIN_EDIT.make_active_user_consultant);
Router.post("/Edit_Advertisment",ADMIN_EDIT.edit_advertisment);
//< EDIT//
//<=====================================================================================Admin==================================================================================================


//>=====================================================================================Institute==================================================================================================

//> POST//
Router.post("/Create_Customer", INSTITUTE_POST.create_customer);
Router.post("/CreateCustomer", INSTITUTE_POST.create_customer_api);
Router.post("/Add_My_Consultant", INSTITUTE_POST.add_my_consultant);
Router.post("/Get_Ins_My_Consultant", INSTITUTE_POST.get_ins_my_consultant);
Router.post("/Create_vacancy", INSTITUTE_POST.create_vacancy);
Router.post("/Create_Uncovered_vacancy", INSTITUTE_POST.create_uncovered_vacancy);
Router.post("/Create_Uncovered_vacancy_external", INSTITUTE_POST.create_uncovered_vacancy_external);
Router.post("/Create_Uncovered_vacancy_internal", INSTITUTE_POST.create_uncovered_vacancy_internal);
Router.post("/Create_Absence",INSTITUTE_POST.create_absence);
Router.post("/Approve_Absence",INSTITUTE_POST.approve_absence);
Router.post("/Deny_Absence",INSTITUTE_POST.deny_Absence);
Router.post("/Get_MyInstitute", INSTITUTE_POST.get_my_institute);
Router.post("/Get_CoveredSchedules", INSTITUTE_POST.get_covered_schedule);
Router.post("/Get_My_Ins_Vacancy", INSTITUTE_POST.get_draft_vacancy);
Router.post("/Get_All_Absence",INSTITUTE_POST.get_all_absence);
Router.post("/Get_Uncovered_schedule",INSTITUTE_POST.get_uncovered_schedule);
Router.post("/Get_Absent_staff",INSTITUTE_POST.get_absence_staff);
Router.post("/Get_Internal_staff",INSTITUTE_POST.get_internal_teacher);
Router.post("/Get_My_Consultant", INSTITUTE_POST.get_my_consultant);
Router.post("/Get_My_Consultant_Api", INSTITUTE_POST.get_my_consultant_API);
Router.post("/Get_My_Customer", INSTITUTE_POST.get_my_customer);
Router.post("/Get_Absence_Count", INSTITUTE_POST.get_absence_count);
Router.post("/Get_Absence_Count_Graph", INSTITUTE_POST.get_absence_count_graph);
Router.post("/Get_Lesson_Count", INSTITUTE_POST.get_filledOrunfill_count);
Router.post("/Get_Cover_Count", INSTITUTE_POST.get_coverOruncover_count);
Router.post("/Get_Deny_List", INSTITUTE_POST.get_deny_list);
Router.post("/Login", INSTITUTE_POST.login);
Router.get("/verfiy/:token", INSTITUTE_POST.verify_customer);


//< POST//

//> GET//

 Router.get("/Get_pub_vacany",INSTITUTE_GET.get_publish_vacancy);
 Router.get("/Get_completed_vacany",INSTITUTE_GET.get_completed_vacancy);
 Router.get("/Get_Institutes",INSTITUTE_GET.get_institute);
 Router.get("/GET_TIMEZONE",INSTITUTE_GET.get_TimeZone);


 Router.post("/Get_All_Vacancy",INSTITUTE_GET.get_All_vacancy);
 Router.post("/Get_All_Vacancy_Customer",INSTITUTE_GET.get_All_vacancy_cus);
 Router.post("/Get_vacancy_dates",INSTITUTE_GET.get_vacancy_dates);
 Router.post("/Get_vacancy_dates_customer",INSTITUTE_GET.get_vacancy_dates_Customer);
//< GET//

//<=====================================================================================Institute==================================================================================================


//>=====================================================================================Common==================================================================================================

//> POST//
Router.post("/Add_title", COMMON_POST.add_title);
Router.post("/Add_Completed_Feedback", COMMON_POST.add_feedback_to_completed_vacancy);
Router.post("/Add_Organization", COMMON_POST.add_organization_type);
Router.post("/Add_Leave_Master",COMMON_POST.add_leave_master);
Router.post("/Get_Address",COMMON_POST.get_address_by_postcode);
Router.post("/Assign_vacancy",COMMON_EDIT.assign_vacancy);
Router.post("/Get_Myvacancy",COMMON_POST.get_my_vacancy);
Router.post("/Get_MyCompletedVacancy",COMMON_POST.get_my_completed_vacancy);
Router.post("/Get_My_Completed_Vacancy",COMMON_POST.get_my_completed_vacancy_api);
Router.post("/Complete_vacancy",COMMON_EDIT.complete_my_vacancy);
Router.post("/Get_vacancy", COMMON_POST.get_vacancy);
Router.post("/Consultant_Feedback", COMMON_POST.consultant_feedback);
Router.post("/Customer_Feedback", COMMON_POST.customer_feedback);
Router.post("/Get_Rating", COMMON_POST.get_rating);
Router.post("/Create_Chat", COMMON_POST.Create_Chat);
Router.post("/Get_My_Chat", COMMON_POST.Get_My_chat);
Router.post("/Chat", COMMON_POST.Chat);
Router.post("/Get_Chat", COMMON_POST.Get_Chat);
Router.post("/Email_validation", COMMON_POST.Validation);
Router.post("/Get_profile", COMMON_POST.MyPofile);
Router.post("/Add_tick_box",COMMON_POST.Tick_Box);
Router.post("/Cancel_Express_Pass_Api",COMMON_POST.Cancel_express_pass_api);
Router.post("/Forgot_Password",COMMON_POST.Forgot_Password_ALL);
Router.get("/Forgot_Password_view/:token",COMMON_POST.Forgot_Password_View);
Router.post("/Forgot_Password_view/:token",COMMON_POST.Forgot_Password_View_2);
Router.post("/Get_vacancy_All_type", COMMON_POST.Get_Vacancy_by_Date_All_type);
Router.post("/Get_vacancy_All_by_paid_status", COMMON_POST.Get_Vacancy_by_Paid_Status);
Router.post("/Make_Paid", COMMON_POST.Add_Paid_Status);
Router.post("/Send_Manual_Notification", COMMON_POST.Send_Notification_Manual);
//< POST//

//> GET//

Router.get("/Get_PublidhTo",COMMON_GET.get_publish_type);
Router.get("/Get_Organization",COMMON_GET.get_organization_type);
Router.get("/Get_Leave_Master",COMMON_GET.get_level_master);
Router.get("/Get_PostCodes",COMMON_GET.get_postcode_info);
Router.get("/Get_Title",COMMON_GET.get_title);
Router.get("/Get_Postion",COMMON_GET.get_postion);
Router.get("/Get_Link",COMMON_GET.get_link);
Router.get("/Get_Pass",COMMON_GET.get_sub_pass);
Router.get("/Send_Message",COMMON_GET.Fcm_Message);
//< GET//





//<=====================================================================================Common==================================================================================================


//>=====================================================================================Customer==================================================================================================

//> POST//
Router.post("/Create_Schedule",CUSTOMER_POST.create_schedule);
Router.post("/Get_my_schedule",CUSTOMER_POST.get_myschedule);
Router.post("/Get_my_absence",CUSTOMER_POST.get_my_absence);
Router.post("/Get_my_covered",CUSTOMER_POST.get_my_covered);
Router.post("/Get_I_covered",CUSTOMER_POST.get_I_covered);
Router.post("/Get_MyCus_vacancy",CUSTOMER_POST.get_my_vacancy_customer);
Router.post("/Assigned_Cover_Count",CUSTOMER_POST.assigned_cover_count);
Router.post("/Get_Vacancy_Status",CUSTOMER_POST.get_vacancy_status);
Router.post("/Get_Vacancy_Count",CUSTOMER_POST.get_vacancy_status_count);
Router.post("/Delete_Vacancy_Customer",CUSTOMER_POST.Cancel_Vacnacy_4pm);

//< POST//

//> GET//

//< GET// 


//EDIT
Router.post("/Approve_My_Vacancy",CUSTOMER_EDIT.my_vacancy_status_cus);
Router.post("/Deny_My_Vacancy",CUSTOMER_EDIT.deny_my_vacancys_cus);
Router.post("/Edit_Profile_Customer",CUSTOMER_EDIT.Edit_Customer_Profile);
Router.post("/Approve_Vacancy_request",CUSTOMER_EDIT.Approve_Vacancy_request);
Router.post("/logout",CUSTOMER_EDIT.logout);
//EDIT




//<=====================================================================================Customer==================================================================================================

//>=====================================================================================CONSULTANT==================================================================================================

//> POST//
Router.post("/Create_Substitute",CONSULTANT_POST.create_substitute);
Router.post("/Create_Open_Application",CONSULTANT_POST.open_application_form);
Router.post("/Create_ad_form",CONSULTANT_POST.advertisement_application_form);
Router.post("/Get_Consultant_ScheduleCount",CONSULTANT_POST.Get_Consultant_Schedule_Count);
Router.post("/Get_ReservedPool",CONSULTANT_POST.Get_Consultant_Schedule_Count);
Router.post("/Consultant_Overview",CONSULTANT_POST.consultant_overview);
Router.post("/Cancel_Vacancy",CONSULTANT_POST.Cancel_Vacancy);
Router.post("/Get_Available_jobs",CONSULTANT_POST.consultant_available_jobs);
Router.post("/Get_My_jobs",CONSULTANT_POST.consultant_My_Jobs);
Router.post("/Get_Open_Applications",CONSULTANT_POST.get_open_application);
Router.post("/Get_Ad_Applications",CONSULTANT_POST.get_ad_application);

//< POST//

//> GET//

//< GET//


//> EDIT//
Router.post("/Update_ConsultantProfile",CONSULTANT_EDIT.Edit_Consultant_Profile);
Router.post("/Open_Application_Approve",CONSULTANT_EDIT.open_application_form_approve);
Router.post("/Ad_Application_Approve",CONSULTANT_EDIT.Ad_application_form_approve);
//< EDIT//

//<=====================================================================================CONSULTANT==================================================================================================


//========================================================================================DELETE=====================================================================================================
Router.post("/delete_vacancy",COMMON_DELETE.delete_vacancy);
Router.post("/delete_consultant",COMMON_DELETE.delete_consultant);
Router.post("/delete_inactive_consultant",COMMON_DELETE.delete_inactive_consultant);
Router.post("/delete_deny_request",COMMON_DELETE.delete_deny_request_list);
Router.post("/delete_absence_request",COMMON_DELETE.delete_absence_request);
Router.post("/delete_customer",COMMON_DELETE.delete_customer);
Router.post("/delete_description_master",COMMON_DELETE.delete_description_ticktbox_master);
Router.post("/delete_express_pass",COMMON_DELETE.delete_express_pass);
Router.post("/delete_express_pass_users",COMMON_DELETE.delete_express_pass_users);
Router.post("/delete_faq_master",COMMON_DELETE.delete_faq_master);
Router.post("/delete_faq_master_list",COMMON_DELETE.Delete_faq_master_list);
Router.post("/delete_feedback",COMMON_DELETE.delete_feedback);
Router.post("/delete_institute",COMMON_DELETE.delete_institute);
Router.post("/delete_ins_req_info",COMMON_DELETE.delete_ins_req_info);
Router.post("/delete_leave_master",COMMON_DELETE.delete_leave_master);
Router.post("/delete_legal_des",COMMON_DELETE.delete_legal_des);
Router.post("/delete_legal_master",COMMON_DELETE.delete_legal_master);
Router.post("/delete_my_schedule",COMMON_DELETE.delete_my_schedule);
Router.post("/delete_delete_org_type",COMMON_DELETE.delete_org_type);
Router.post("/delete_postion_master",COMMON_DELETE.delete_postion_master);
Router.post("/delete_publishto_master",COMMON_DELETE.delete_publishto_master);
Router.post("/delete_title_master",COMMON_DELETE.delete_title_master);
Router.post("/delete_my_consultant",COMMON_DELETE.delete_my_consultant);
Router.post("/delete_my_chat_profile",COMMON_DELETE.delete_chat_profile);
Router.post("/delete_contact_us",COMMON_DELETE.delete_contact_us);
Router.post("/delete_feedback_for_dohr",COMMON_DELETE.delete_feedback_for_dohr);
Router.post("/delete_open_application",COMMON_DELETE.delete_open_application);
Router.post("/delete_ad",COMMON_DELETE.delete_advertisment);
Router.post("/delete_ad_application_form",COMMON_DELETE.delete_advertisment_applications);
Router.post("/delete_sub_email",COMMON_DELETE.delete_sub_email);

//========================================================================================DELETE=====================================================================================================

module.exports = Router;