export default interface Product {
    id?: string;
    name: string;
    details: string;
    brandId: string;
    purchasePrice: number;
    salePrice: number;
    availableQuantity: number;
}