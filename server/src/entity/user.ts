import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    username: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    password: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    email: string

    @Column({
        collation: 'utf8mb4_unicode_ci',
        default: false
    })
    emailVerified: boolean

    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci'
    })
    mobilePhone: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    jwt: string

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
    lastLoginTime: string
    
    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci',
        default: 'active'
    })
    state: string
}