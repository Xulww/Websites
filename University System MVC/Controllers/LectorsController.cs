using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using University.Models;
using University.ViewModels;

namespace University.Controllers
{
    public class LectorsController : Controller
    {
        private MyDbContext db = new MyDbContext();

        //get method that displays the list of lectors
        public ActionResult Index()
        {
            return View(db.Lectors.ToList());
        }

        //get method that displays the details about given lector using the id
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Lector lector = db.Lectors.Find(id);

            if (lector == null)
            {
                return HttpNotFound();
            }

            var Results = from p in db.Partners
                          select new
                          {
                              p.PartnerID,
                              p.PartnerName,
                              Checked = ((from lp in db.LectorsToPartners
                                          where (lp.LectorID == id) & (lp.PartnerID == p.PartnerID)
                                          select lp).Count() > 0)
                          };

            var MyVM = new LectorsVM();

            //setting the properties to the lector we want to edit
            MyVM.LectorID = id.Value;
            MyVM.Name = lector.Name;
            MyVM.Surname = lector.Surname;

            //storing the partners we collected using the link/sql command
            var MyCheckBoxList = new List<CheckBoxVM>();

            //foreach partner we add partner in the checkbox list
            foreach (var item in Results)
            {
                MyCheckBoxList.Add(new CheckBoxVM
                {
                    Id = item.PartnerID,
                    Name = item.PartnerName,
                    Checked = item.Checked
                });
            }

            //setting the partners property to contain the partners list
            MyVM.Partners = MyCheckBoxList;

            return View(MyVM);
        }

        public ActionResult Create()
        {
            return View();
        }

        //once the information is recieved from the form of the create method, add and save it to the database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "LectorID,Name,Surname")] Lector lector)
        {
            if (ModelState.IsValid)
            {
                db.Lectors.Add(lector);
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(lector);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Lector lector = db.Lectors.Find(id);

            if (lector == null)
            {
                return HttpNotFound();
            }

            var Results = from p in db.Partners
                          select new
                          {
                              p.PartnerID,
                              p.PartnerName,
                              Checked = ((from lp in db.LectorsToPartners
                                          where (lp.LectorID == id) & (lp.PartnerID == p.PartnerID)
                                          select lp).Count() > 0)
                          };

            //now the viewmodel
            var MyVM = new LectorsVM();

            //setting the properties to the lector we want to edit
            MyVM.LectorID = id.Value;
            MyVM.Name = lector.Name;
            MyVM.Surname = lector.Surname;

            //storing the partners we collected using the link/sql command
            var MyCheckBoxList = new List<CheckBoxVM>();

            //foreach partner we add partner in the checkbox list
            foreach (var item in Results)
            {
                MyCheckBoxList.Add(new CheckBoxVM
                {
                    Id = item.PartnerID,
                    Name = item.PartnerName,
                    Checked = item.Checked
                });
            }

            //setting the partners property to contain the partners list
            MyVM.Partners = MyCheckBoxList;

            return View(MyVM);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(LectorsVM lector)
        {
            if (ModelState.IsValid)
            {
                //getting the record from the database for the lector that we currently edit
                var MyLector = db.Lectors.Find(lector.LectorID);

                //setting the new values from the vm
                MyLector.Name = lector.Name;
                MyLector.Surname = lector.Surname;

                //checking if the lector was added
                foreach (var item in db.LectorsToPartners)
                {
                    if (item.LectorID == lector.LectorID)
                    {            
                        db.Entry(item).State = System.Data.Entity.EntityState.Deleted;
                    }
                }

                foreach (var item in lector.Partners)
                {
                    //linking the checked boxes from the user to the current lector
                    if (item.Checked)
                    {
                        db.LectorsToPartners.Add(new LectorToPartner()
                        {
                            LectorID = lector.LectorID,
                            PartnerID = item.Id
                        });
                    }
                }

                db.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(lector);
        }

        //getting the id of the chosen lector
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Lector lector = db.Lectors.Find(id);

            if (lector == null)
            {
                return HttpNotFound();
            }
            return View(lector);
        }

        //deleting the lector based on his/hers id
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Lector lector = db.Lectors.Find(id);

            db.Lectors.Remove(lector);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
