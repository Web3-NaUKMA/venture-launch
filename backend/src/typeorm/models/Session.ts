import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ISession } from '../../types/session.interface';
import { User } from './User';

@Entity()
export class Session implements ISession {
  @PrimaryColumn({ type: 'varchar' })
  sessionId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
