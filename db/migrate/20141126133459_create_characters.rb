class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :class
      t.integer :intelligence
      t.integer :strength
      t.integer :critical_strike
      t.integer :stamina
      t.integer :fervor
    end
  end
end
