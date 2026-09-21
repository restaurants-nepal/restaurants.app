import type { Modules } from "@/shared/enums/modules";
import type { Pages } from "@/shared/enums/pages";

export enum RestaurantActions {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum MenuItemActions {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum CategoryActions {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum Actions {
  VIEW = "view",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export type PermissionString =
  | `${Modules.PAGE}:${Pages}`
  | `${Modules.RESTAURANT}:${RestaurantActions}`
  | `${Modules.MENU_ITEM}:${MenuItemActions}`
  | `${Modules.CATEGORY}:${CategoryActions}`
  | `${Modules.RESTAURANT_TABLE}:${Actions}`;
