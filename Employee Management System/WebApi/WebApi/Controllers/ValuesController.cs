using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("DepID");
            dt.Columns.Add("DepName");
            dt.Columns.Add("DepCreated");
            dt.Columns.Add("DepStreetName");
            dt.Columns.Add("DepStreetNumber");
            dt.Columns.Add("DepManagerName");

            dt.Rows.Add(1, "Finance", "2012-06-08 12:13:14.000", "Danail Nikolaev", 24, "Hristo Angelov");
            dt.Rows.Add(2, "IT", "2012-06-09 12:13:14.000", "Aleko Konstantinov", 12, "Petar Parushev");

            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
