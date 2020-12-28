using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"SELECT * 
                             FROM dbo.Departments";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;

                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Department dep)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = dep.DepartmentCreated;
                string format = "dd-MM-yyyy HH:mm:ss";

                string query = @"INSERT INTO dbo.Departments 
                                 VALUES ('" + dep.DepartmentName + "', '" + time.ToString(format) + "', '" + dep.DepartmentStreetName + "', " + dep.DepartmentStreetNumber + ", '" + dep.DepartmentManagerName + "')";

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

        public string Put(Department dep)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = dep.DepartmentCreated;
                string format = "dd-MM-yyyy HH:mm:ss";

                string query = @"UPDATE dbo.Departments
                                 SET DepartmentName = '" + dep.DepartmentName + "', DepartmentCreated = '" + time.ToString(format) + "', DepartmentStreetName = '" + dep.DepartmentStreetName + "', DepartmentStreetNumber = " + dep.DepartmentStreetNumber + ", DepartmentManagerName = '" + dep.DepartmentManagerName + @"'
                                 WHERE DepartmentID = " + dep.DepartmentID + ";";

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

                string query = @"DELETE FROM dbo.Departments
                                 WHERE DepartmentID = " + id;

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
