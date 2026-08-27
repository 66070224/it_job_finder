import { IsUUID } from "class-validator";

export default class ExchangeCodeToToken {
    @IsUUID()
    code!: string
}