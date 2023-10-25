export class AuthService {
  notReserveMode = true;

  isInReserveMode() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.notReserveMode)
    });
    return promise;
  }

  switchReserveModeOff() {
    this.notReserveMode = true;
  }

  switchReserveModeOn() {
    this.notReserveMode = false;
  }
}
