import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, DeleteDateColumn, BaseEntity, Unique} from 'typeorm';

@Entity()
@Unique(["email"])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

  @Column()
	password: string;

  @Column()
	name: string;

  @Column()
	address: string;

  @Column()
	phone: string;

  @Column({default:true})
	active: Boolean;

  @CreateDateColumn()
	created_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;


  
}