import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { extname } from 'path';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FileService implements OnModuleInit {
  private client: Minio.Client;
  private bucket: string;
  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get('MINIO_BUCKET', 'uploads');
    this.client = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT', 'localhost'),
      port: Number(this.configService.get('MINIO_PORT', 9000)),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
  }
  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) await this.client.makeBucket(this.bucket);
  }

  async upload(user: User, file: Express.Multer.File) {
    const key = `${user.id}/${file.originalname}`;
    await this.client.putObject(this.bucket, key, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });
    return key;
  }

  getPresignedUrl(key: string, expirySeconds = 3600) {
    return this.client.presignedGetObject(this.bucket, key, expirySeconds);
  }

  getStream(key: string) {
    return this.client.getObject(this.bucket, key);
  }

  remove(key: string) {
    return this.client.removeObject(this.bucket, key);
  }
}
