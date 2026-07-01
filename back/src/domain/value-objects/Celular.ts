export class Celular {
  private readonly _value: string;

  constructor(value: string) {
    const cleaned = value.replace(/\D/g, '');
    if (!this.isValid(cleaned)) {
      throw new Error('Invalid mobile number. Must have 11 digits (DDD + number)');
    }
    this._value = cleaned;
  }

  private isValid(value: string): boolean {
    return /^\d{11}$/.test(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Celular): boolean {
    return this._value === other.value;
  }
}