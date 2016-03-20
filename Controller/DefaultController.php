<?php

namespace PhpInk\Nami\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('NamiAdminBundle:Default:index.html.twig');
    }
}
