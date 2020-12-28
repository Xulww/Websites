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
    public class CompanyController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"SELECT * 
                             FROM dbo.Companies";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeManagerDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;

                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Company com)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = com.CompanyCreated;
                string format = "dd-MM-yyyy HH:mm:ss";

                string query = @"INSERT INTO dbo.Companies 
                                 VALUES ('" + com.CompanyName + "', '" + time.ToString(format) + "', '" + com.CompanyStreetName + "', " + com.CompanyStreetNumber + ", '" + com.CompanyCEOName + "')";

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

        public string Put(Company com)
        {
            try
            {
                DataTable table = new DataTable();
                DateTime time = com.CompanyCreated;
                string format = "dd-MM-yyyy HH:mm:ss";

                string query = @"UPDATE dbo.Companies
                                 SET CompanyName = '" + com.CompanyName + "', CompanyCreated = '" + time.ToString(format) + "', CompanyStreetName = '" + com.CompanyStreetName + "', CompanyStreetNumber = " + com.CompanyStreetNumber + ", CompanyCEOName = '" + com.CompanyCEOName + @"'
                                 WHERE CompanyID = " + com.CompanyID + ";";

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

                string query = @"DELETE FROM dbo.Companies
                                 WHERE CompanyID = " + id;

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
