export class LocalStorageService {
  constructor(caller) {
    this.caller = caller;
  }

  setValue(callersObject) {
    localStorage.setItem(this.caller, JSON.stringify(callersObject));
  }

  getValue() {
    return JSON.parse(localStorage.getItem(this.caller));
  }
}

