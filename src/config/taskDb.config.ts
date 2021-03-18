import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/auth/entity/user.entity";
import { task } from "src/tasks/entity/task.entity";

export const taskDb: TypeOrmModule = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Tusharroy@21',
        database: 'taskmanagement',
        entities: [task, Users],
        autoLoadEntities: true,
        synchronize: true
        //shouldn't be used in production can lead to lose data.
}