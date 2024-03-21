import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, DeleteDateColumn, BaseEntity, Unique} from 'typeorm';

@Entity()
@Unique(["email"])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

  @Column({ select: false })
	password: string;

  @Column()
	name: string;

  @Column()
	address: string;

  @Column()
	phone: string;

  @Column({default:true})
	active: Boolean;

  @CreateDateColumn({ select: false })
	created_at: Date;

	@DeleteDateColumn({ select: false })
	deleted_at: Date;
  
}