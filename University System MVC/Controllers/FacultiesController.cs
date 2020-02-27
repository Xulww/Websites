using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using University.Models;

namespace University.Controllers
{
    public class FacultiesController : Controller
    {
        private MyDbContext db = new MyDbContext();

        //get method that displays the list of faculties
        public ActionResult Index()
        {            
            return View(db.Faculties.ToList());
        }

        //get method that displays the details about given faculty using its id
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Faculty faculty = db.Faculties.Find(id);

            if (faculty == null)
            {
                return HttpNotFound();
            }

            return View(faculty);
        }
        
        public ActionResult Create()
        {
            return View();
        }

        //once the information is recieved from the form of the create method, add and save it to the database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "FacultyID,FacultyName")] Faculty faculty)
        {
            if (ModelState.IsValid)
            {
                db.Faculties.Add(faculty);
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(faculty);
        }

        //get method that finds and returns the faculty based on its id
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Faculty faculty = db.Faculties.Find(id);

            if (faculty == null)
            {
                return HttpNotFound();
            }

            return View(faculty);
        }

        //giving and saving the information recieved from the form to the database
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "FacultyID,FacultyName")] Faculty faculty)
        {
            if (ModelState.IsValid)
            {
                db.Entry(faculty).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(faculty);
        }

        //getting the id of the chosen faculty
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Faculty faculty = db.Faculties.Find(id);

            if (faculty == null)
            {
                return HttpNotFound();
            }

            return View(faculty);
        }

        //deleting the faculty based on its id
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Faculty faculty = db.Faculties.Find(id);

            db.Faculties.Remove(faculty);
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
