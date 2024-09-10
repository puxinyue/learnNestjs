import { SetMetadata } from "@nestjs/common";

export const RequireRole = () => SetMetadata('requireRole', true)

export const  RequirePermission = (...permissions: string[]) => SetMetadata('require-permission', permissions);
