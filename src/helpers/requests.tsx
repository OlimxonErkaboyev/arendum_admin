/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../config";
import {
  AccountFilterType,
  LoginParamsType,
  RegionParamsType,
  UserParamsType,
} from "../types";
import { ApplicationFilterType } from "../types/application";
import {
  DriversFilterType,
  DriversParamsType,
  UploadImgType,
} from "../types/drivers";
import { RegionFilterType } from "../types/region";
import { ReportFilterType } from "../types/reprortFilterType";
import { RolesParamsType } from "../types/roles";
import { ServicesFilterType, ServicesParamsType } from "../types/service";
import { $api } from "./api";

export const requests = {
  //TODO: API Requests
  //* AUTH
  postLogin: (params: LoginParamsType) =>
    $api.post(`${API_URL}/auth/login`, params),
  fetchMe: () => $api.get(`${API_URL}/auth/profile`),
  postLogout: () => $api.get(`${API_URL}/auth/logout`),
  postRefreshToken: () => $api.post(`${API_URL}/auth/refresh-token`),
  //* REGION
  postRegionCreate: (params: RegionParamsType) =>
    $api.post(`${API_URL}/region/create`, params), //! done
  fetchRegionList: (params: RegionFilterType) =>
    $api.get(`${API_URL}/region`, { params }), //! done
  regionUpdate: (id: string, params: RegionParamsType) =>
    $api.put(`${API_URL}/region/update/${id}`, params), //! done
  fetchRegionDetail: (id: string) => $api.get(`${API_URL}/region/${id}`), //! done
  regionDelete: (id: string) => $api.delete(`${API_URL}/region/${id}`), //! done
  //* Drivers
  fetchDriversList: (params: DriversFilterType) =>
    $api.get(`${API_URL}/driver`, { params }),
  fetchFileUpload: (params: UploadImgType) =>
    $api.post(`${API_URL}/file-upload`, params),
  postDriverCreate: (params: DriversParamsType) =>
    $api.post(`${API_URL}/driver`, params),
  fetchDriverDetail: (id: string) => $api.get(`${API_URL}/driver/${id}`), //! done
  driverUpdate: (id: string, params: DriversParamsType) =>
    $api.put(`${API_URL}/driver/update/${id}`, params), //! done
  driverDelete: (id: string) => $api.delete(`${API_URL}/driver/${id}`), //! done
  fetchStatics: () => $api.get(`${API_URL}/static/driver`),
  //* Services
  fetchServicesList: (params: ServicesFilterType) =>
    $api.get(`${API_URL}/services`, { params }),
  postServicesCreate: (params: ServicesParamsType) =>
    $api.post(`${API_URL}/services`, params),
  fetchServicesDetail: (id: string) => $api.get(`${API_URL}/services/${id}`), //! done
  servicesUpdate: (id: string, params: ServicesParamsType) =>
    $api.patch(`${API_URL}/services/${id}`, params), //! done
  servicesDelete: (id: string) => $api.delete(`${API_URL}/services/${id}`),
  //* USER
  fetchUserList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/users`, { params }),
  postUserCreate: (params: UserParamsType) =>
    $api.post(`${API_URL}/users`, params),
  userUpdate: (id: string, params: UserParamsType) =>
    $api.patch(`${API_URL}/users/${id}`, params),
  fetchUserDetail: (id: string) => $api.get(`${API_URL}/users/${id}`),
  userDelete: (id: string) => $api.delete(`${API_URL}/users/${id}`),
  fetchUserRoles: () => $api.get(`${API_URL}/roles`),
  fetchUserPermissions: () => $api.get(`${API_URL}/permissions`),
  fetchUserStatus: () => $api.get(`${API_URL}/users/status/user-status`),
  updateUserChangeStatus: (id: string, params: AccountFilterType) => {
    const queryParams = new URLSearchParams(params as any).toString();
    $api.post(`${API_URL}/users/change-status/${id}?${queryParams}`);
  },
  //* Application
  fetchApplicationList: (params: ApplicationFilterType) =>
    $api.get(`${API_URL}/applications`, { params }),
  fetchstatisticsCurrentDate: (params: ApplicationFilterType) =>
    $api.get(`${API_URL}/applications/find/current-date`, { params }),
  fetchApplicationByTodayList: (params: ApplicationFilterType) =>
    $api.get(`${API_URL}/applications/applications/by-region`, { params }),
  fetchApplicationByServiceList: (params: ApplicationFilterType) =>
    $api.get(`${API_URL}/applications/applications/by-service`, { params }),
  //* Roles
  fetchRolesList: (params: AccountFilterType) =>
    $api.get(`${API_URL}/roles`, { params }),
  postRolesCreate: (params: RolesParamsType) =>
    $api.post(`${API_URL}/roles`, params),
  rolesUpdate: (id: string, params: RolesParamsType) =>
    $api.patch(`${API_URL}/roles/${id}`, params),
  fetchRolesDetail: (id: string) => $api.get(`${API_URL}/roles/${id}`),
  rolesDelete: (id: string) => $api.delete(`${API_URL}/roles/${id}`),
  //*Reports
  fetchReportList: (params: ReportFilterType) =>
    $api.get(`${API_URL}/applications/find/reports`, { params }),
  fetchReportsDownloadList: (params: ReportFilterType) =>
    $api.get(`${API_URL}/applications/reports/excel`, {
      params,
      responseType: "blob", // Faylni binary formatda olish
    }),
};
