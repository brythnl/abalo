<?php

require dirname(__FILE__) . '/vendor/autoload.php';

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Nachricht implements MessageComponentInterface
{
    protected $clients;

    public function __construct() {
        $this->clients = new SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
    }

     public function onMessage(ConnectionInterface $from, $msg)
     {
        foreach ($this->clients as $client) {
            if ($from != $client) {
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, Exception $e)
    {
        $conn->close();
    }
}

$app = new Ratchet\App('localhost', 8085);

$app->route('/nachricht', new Nachricht, array('*'));
$app->run();
