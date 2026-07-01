export class Telefone {
  private readonly _value: string;

  constructor(value: string) {
    const cleaned = value.replace(/\D/g, '');
    if (!this.isValid(cleaned)) {
      throw new Error('Invalid phone number. Must have 10 digits (DDD + number)');
    }
    this._value = cleaned;
  }

  private isValid(value: string): boolean {
    return /^\d{10}$/.test(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: Telefone): boolean {
    return this._value === other.value;
  }
}