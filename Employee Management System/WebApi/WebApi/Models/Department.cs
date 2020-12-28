using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Department
    {
        public long DepartmentID { get; set; }
        public string DepartmentName { get; set; }
        public DateTime DepartmentCreated { get; set; }
        public string DepartmentStreetName { get; set; }
        public int DepartmentStreetNumber { get; set; }
        public string DepartmentManagerName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}