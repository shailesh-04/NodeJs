const db =  require("../config/db.config");

db.query(`
INSERT INTO users (name, email, password) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'password1'),
('Bob Smith', 'bob.smith@example.com', 'password2'),
('Charlie Brown', 'charlie.brown@example.com', 'password3'),
('Diana Prince', 'diana.prince@example.com', 'password4'),
('Ethan Hunt', 'ethan.hunt@example.com', 'password5'),
('Fiona Gallagher', 'fiona.gallagher@example.com', 'password6'),
('George Costanza', 'george.costanza@example.com', 'password7'),
('Hannah Baker', 'hannah.baker@example.com', 'password8'),
('Ian Malcolm', 'ian.malcolm@example.com', 'password9'),
('Jack Sparrow', 'jack.sparrow@example.com', 'password10'),
('Kara Danvers', 'kara.danvers@example.com', 'password11'),
('Luke Skywalker', 'luke.skywalker@example.com', 'password12'),
('Mia Wallace', 'mia.wallace@example.com', 'password13'),
('Nina Simone', 'nina.simone@example.com', 'password14'),
('Oliver Twist', 'oliver.twist@example.com', 'password15'),
('Peter Parker', 'peter.parker@example.com', 'password16'),
('Quinn Fabray', 'quinn.fabray@example.com', 'password17'),
('Rick Grimes', 'rick.grimes@example.com', 'password18'),
('Samantha Carter', 'samantha.carter@example.com', 'password19'),
('Tony Stark', 'tony.stark@example.com', 'password20'),
('Uma Thurman', 'uma.thurman@example.com', 'password21'),
('Vincent Vega', 'vincent.vega@example.com', 'password22'),
('Will Smith', 'will.smith@example.com', 'password23'),
('Xena Warrior', 'xena.warrior@example.com', 'password24'),
('Yoda Master', 'yoda.master@example.com', 'password25'),
('Zoe Saldana', 'zoe.saldana@example.com', 'password26'),
('Amelia Pond', 'amelia.pond@example.com', 'password27'),
('Ben Wyatt', 'ben.wyatt@example.com', 'password28'),
('Cersei Lannister', 'cersei.lannister@example.com', 'password29'),
('David Rose', 'david.rose@example.com', 'password30');
`,(err)=>{
  if(err){
    console.error("Found Following ERROR :--",err);
  }else
    console.log("\n -> DUMMY 30 RECORD IS INSETED ....");
  
});
db.end((err) => {
    if (err) {
        console.error('Error ending the connection: ' + err.stack);
        return;
    }
    console.log('Connection closed.');
});