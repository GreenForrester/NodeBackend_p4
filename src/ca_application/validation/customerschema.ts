import { z } from "zod";
//zod library for server side data validation
export const CustomerSchema = z.object({

  customerName: z.string().min(1,"Customer name cannot be empty"),
  cemail: z.string().email("Invalid email address"),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  orders: z.array(z.any()).optional()
});
