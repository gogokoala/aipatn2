import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity()
export class OAuth2 {

    @PrimaryColumn({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    clientId: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    accessToken: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci'
    })
    expiresIn: number

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    createTime: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    lastRefreshTime: string
    
}