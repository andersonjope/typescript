export default class Address {
    // Propriedades da classe
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  
    // Construtor da classe
    constructor(street: string, number: number, city: string, state: string, zipCode: string) {
      if (!this.validate(street, number, city, state, zipCode)) {
        throw new Error("Invalid address data");
      }
      this.street = street;
      this.number = number;
      this.city = city;
      this.state = state;
      this.zipCode = zipCode;
    }
  
    // Método de validação
    private validate(street: string, number: number, city: string, state: string, zipCode: string): boolean {
      const zipCodePattern = /^\d{5}-\d{3}$/; // Exemplo de padrão para CEP brasileiro
      
      // Verificar se todas as propriedades estão preenchidas e se o CEP está no formato correto
      return (
        typeof street === 'string' && street.length > 0 &&
        typeof number === 'number' && number > 0 &&
        typeof city === 'string' && city.length > 0 &&
        typeof state === 'string' && state.length === 2 &&
        zipCodePattern.test(zipCode)
      );
    }
  
    // Método para obter uma representação do endereço como string
    public toString(): string {
      return `${this.street}, ${this.number} - ${this.city}/${this.state}, ${this.zipCode}`;
    }
  }