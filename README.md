# AppointmentBooking

## Introduction
This is an appointment booking application made with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Technologies Used
- [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3
- [PrimeNG](https://primeng.org/) version 16.2.0
- [Bootstrap](https://getbootstrap.com/) version 5.3.1
- [RxJS](https://rxjs.dev/) version 7.8.0
- Third party backend API made via [Java Springboot](https://spring.io/projects/spring-boot)

## Pages
### 1. Home / Companies Page
- This page lets you add new companies, or edit existing ones
- Interaction:
  * Use "New Company" to add new company, or click on existing ones to change it.
  * Click "Add Company" to add company if form is correct or "Cancel" to cancel the form application
  * Click "Update" to update the formerly selected company.
  * Fill in the three FormControl elements to make the form submittable
  * Click the manage company dropdown, to select your preferred interaction.
     * You can only delete a company, if there aren't any works which can get reservations.
     * You can only edit the company's credentials if there aren't any works which can get reservations.
  * Here you can add works, which routes you to the next site.

### 2. Works Page
- This page lets you add works to your existing company.
- Validations are present, therefore you cannot apply invalid form (first guard).
- Interaction:
  * Use "Add Work" to add works
  * Use "Cancel" to cancel the form
  * Use "Add works as reservation" to add your works to the reservation page
  * You can click on a work to route to the "reservation" page

### 3. Reservation Page
- This page lets you add your selected works as a reservation
- Additional guards are present, so you cannot add more than one instance of the same work
- Interaction:
  * Use "Add to reservation", "Edit Work", "Delete Work" or "Add works as reservation!" to access the according functionality
  * You can select multiple reservations based off of their duration and company hours.

## Code Examples

### Company Edit Form Application
```typescript
  onAddCompany(form: NgForm) {
    const value = form.value;
    if (!this.isEditMode) {
      const newCompany = new Company(
        0,
        value.companyName,
        value.companyAddress,
        value.companyHours,
        []
      );
      this.companySrvc.addCompany(newCompany);
      this.dataStorage.createCompany(newCompany);
    } else {
      const updatedCompany: Company = new Company(
        this.idOfEditedCompany,
        value.companyName,
        value.companyAddress,
        value.companyHours,
        this.workSrvc.getWorksByCompanyId(this.idOfEditedCompany)
      );
      if (
        !this.companySrvc
          .getCompanies()
          .some(
            (company) =>
              company.name === updatedCompany.name &&
              company.address === updatedCompany.address &&
              company.businessHours === updatedCompany.businessHours
          )
      ) {
        this.companySrvc.updateCompany(updatedCompany, this.idOfEditedCompany);
        this.dataStorage.updateCompany(updatedCompany, this.idOfEditedCompany)
      }
    }
    this.router.navigate(['/companies']);
    this.isEditMode = false;
  }
```

### Reservation Add Form
```typescript
  onAddReservation(form: NgForm) {
    const value = form.value;
    this.newReservation = new Reservation(
      this.resSrvc.getHighestReservationId(),
      value.resName,
      value.resPhone,
      value.resEmail,
      this.date,
      this.resSrvc.sumWorkDurations(),
      this.resSrvc.getReservables()
    );
    this.resSrvc.addReservation(this.newReservation);
    console.log(this.newReservation);
    this.showPopup = true;
  }
```

## Installation
Use
```bash
npm install
```
to install all necessary modules for running the application.

## Running The App
Use
```bash
npm start
```
to start the application.

## Default Host
Visit [localhost:4200](http://localhost:4200/) to access the server
