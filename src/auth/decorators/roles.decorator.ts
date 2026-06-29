
import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/common/enums/roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);

export const PUBLIC_KEY = "public";

export const Public = () => SetMetadata(PUBLIC_KEY, true);