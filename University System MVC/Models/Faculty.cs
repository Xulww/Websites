using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace University.Models
{
    public class Faculty
    {
        public int FacultyID { get; set; }
        public string FacultyName { get; set; }

        //storing the list of associated students
        public virtual ICollection<Student> Students { get; set; }
    }
}