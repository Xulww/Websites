using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace University.ViewModels
{
    public class LectorsVM
    {
        public int LectorID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        //storing all the partners that lectors can be associated with
        public List<CheckBoxVM> Partners { get; set; }
    }
}