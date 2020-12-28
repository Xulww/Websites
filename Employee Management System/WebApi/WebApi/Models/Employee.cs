using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Employee
    {
        public long EmployeeID { get; set; }
        public string EmployeeFullName { get; set; }
        public DateTime EmployeeHired { get; set; }
        public string MailID { get; set; }
        public int PhoneNumber { get; set; }
        public long DepartmentID { get; set; }
        public long CompanyID { get; set; }

        public virtual Department Department { get; set; }
        public virtual Company Company { get; set; }
    }
}