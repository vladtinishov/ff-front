import type { UserDto, ViewerDto } from "@/shared/api";

export interface ViewerType {
    viewer: UserDto
    isLoading: boolean,
}