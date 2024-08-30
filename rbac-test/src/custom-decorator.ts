import { SetMetadata } from "@nestjs/common";

export const RequireRole = () => SetMetadata('requireRole', true)