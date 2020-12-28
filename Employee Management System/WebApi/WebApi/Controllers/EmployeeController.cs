using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"SELECT E.EmployeeID, E.EmployeeFullName, E.EmployeeHired, E.MailID, E.PhoneNumber, D.DepartmentName, C.CompanyName 
                             FROM Employees E 
                             JOIN Departments D ON E.DepartmentID = D.DepartmentID 
                             JOIN Companies C ON E.CompanyID = C.CompanyID";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;

                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = emp.EmployeeHired;
                string format = "yyyy-MM-dd HH:mm:ss";

                string query = @"INSERT INTO dbo.Employees 
                                 VALUES ('" + emp.EmployeeFullName + "', '" + time.ToString(format) + "', '" + emp.MailID + "', " + emp.PhoneNumber + ", " + emp.DepartmentID + ", " + emp.CompanyID + ")";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;

                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed To Add";
            }
        }

        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = emp.EmployeeHired;
                string format = "dd-MM-yyyy HH:mm:ss";

                string query = @"UPDATE dbo.Employees
                                 SET EmployeeFullName = '" + emp.EmployeeFullName + "', EmployeeHired = '" + time.ToString(format) + "', MailID = '" + emp.MailID + "', PhoneNumber = " + emp.PhoneNumber + ", DepartmentID = '" + emp.DepartmentID + "', CompanyID = '" + emp.CompanyID + @"' 
                                 WHERE EmployeeID = " + emp.EmployeeID + ";";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;

                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed To Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"DELETE FROM dbo.Employees
                                 WHERE EmployeeID = " + id;

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;

                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed To Delete";
            }
        }
    }
}
