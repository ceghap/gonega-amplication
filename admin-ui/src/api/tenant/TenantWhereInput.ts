import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type TenantWhereInput = {
  id?: StringFilter;
  name?: StringNullableFilter;
};
