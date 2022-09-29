/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateTenantArgs } from "./CreateTenantArgs";
import { UpdateTenantArgs } from "./UpdateTenantArgs";
import { DeleteTenantArgs } from "./DeleteTenantArgs";
import { TenantFindManyArgs } from "./TenantFindManyArgs";
import { TenantFindUniqueArgs } from "./TenantFindUniqueArgs";
import { Tenant } from "./Tenant";
import { TenantService } from "../tenant.service";

@graphql.Resolver(() => Tenant)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TenantResolverBase {
  constructor(
    protected readonly service: TenantService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async _tenantsMeta(
    @graphql.Args() args: TenantFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Tenant])
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "any",
  })
  async tenants(@graphql.Args() args: TenantFindManyArgs): Promise<Tenant[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Tenant, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "read",
    possession: "own",
  })
  async tenant(
    @graphql.Args() args: TenantFindUniqueArgs
  ): Promise<Tenant | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "create",
    possession: "any",
  })
  async createTenant(@graphql.Args() args: CreateTenantArgs): Promise<Tenant> {
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "update",
    possession: "any",
  })
  async updateTenant(
    @graphql.Args() args: UpdateTenantArgs
  ): Promise<Tenant | null> {
    try {
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Tenant)
  @nestAccessControl.UseRoles({
    resource: "Tenant",
    action: "delete",
    possession: "any",
  })
  async deleteTenant(
    @graphql.Args() args: DeleteTenantArgs
  ): Promise<Tenant | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}