import { UUID } from "crypto";
export interface Category{
    id: UUID;
    name: string;
    description: string;
}